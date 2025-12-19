<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Graduate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    /**
     * Send a message from a public user to a graduate
     */
    public function sendPublicMessage(Request $request)
    {
        $validated = $request->validate([
            'graduate_id' => 'required|exists:graduates,id',
            'sender_name' => 'required|string|max:255',
            'sender_email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        Message::create([
            'graduate_id' => $validated['graduate_id'],
            'sender_name' => $validated['sender_name'],
            'sender_email' => $validated['sender_email'],
            'message' => $validated['message'],
            'is_from_graduate' => false,
        ]);

        return response()->json(['message' => 'Message sent successfully!']);
    }

    /**
     * Display the graduate's chat page with all conversations
     */
    public function index(Request $request): Response
    {
        $graduate = Graduate::where('email', $request->user()->email)->first();

        if (!$graduate) {
            return Inertia::render('Graduate/Chat', [
                'conversations' => [],
                'selectedConversation' => null,
                'messages' => [],
            ]);
        }

        // Get all unique conversations grouped by sender_email
        $conversations = Message::where('graduate_id', $graduate->id)
            ->select('sender_email', 'sender_name')
            ->selectRaw('MAX(created_at) as last_message_at')
            ->selectRaw('COUNT(CASE WHEN is_read = 0 AND is_from_graduate = 0 THEN 1 END) as unread_count')
            ->groupBy('sender_email', 'sender_name')
            ->orderBy('last_message_at', 'desc')
            ->get();

        return Inertia::render('Graduate/Chat', [
            'graduate' => $graduate,
            'conversations' => $conversations,
        ]);
    }

    /**
     * Get messages for a specific conversation
     */
    public function getConversation(Request $request, $senderEmail)
    {
        $graduate = Graduate::where('email', $request->user()->email)->first();

        if (!$graduate) {
            return response()->json(['messages' => []]);
        }

        // Mark messages as read
        Message::where('graduate_id', $graduate->id)
            ->where('sender_email', $senderEmail)
            ->where('is_from_graduate', false)
            ->update(['is_read' => true]);

        $messages = Message::where('graduate_id', $graduate->id)
            ->where('sender_email', $senderEmail)
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json(['messages' => $messages]);
    }

    /**
     * Send a reply from graduate to a public user
     */
    public function sendReply(Request $request)
    {
        $validated = $request->validate([
            'sender_email' => 'required|email',
            'message' => 'required|string',
        ]);

        $graduate = Graduate::where('email', $request->user()->email)->first();

        if (!$graduate) {
            return response()->json(['error' => 'Graduate not found'], 404);
        }

        // Get the sender's name from previous messages
        $previousMessage = Message::where('graduate_id', $graduate->id)
            ->where('sender_email', $validated['sender_email'])
            ->first();

        Message::create([
            'graduate_id' => $graduate->id,
            'sender_name' => $previousMessage ? $previousMessage->sender_name : 'Unknown',
            'sender_email' => $validated['sender_email'],
            'message' => $validated['message'],
            'is_from_graduate' => true,
        ]);

        return response()->json(['message' => 'Reply sent successfully!']);
    }

    /**
     * Display public chat page for a specific graduate
     */
    public function publicChat($graduateId): Response
    {
        $graduate = Graduate::where('id', $graduateId)
            ->where('status', 'approved')
            ->firstOrFail();

        // Get all messages for this graduate (both from public and graduate)
        $messages = Message::where('graduate_id', $graduateId)
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(function ($message) {
                // Anonymize sender information - show only initials
                $nameParts = explode(' ', $message->sender_name);
                $initials = '';
                foreach ($nameParts as $part) {
                    if (!empty($part)) {
                        $initials .= strtoupper($part[0]) . '. ';
                    }
                }

                $emailParts = explode('@', $message->sender_email);
                $anonymizedEmail = substr($emailParts[0], 0, 2) . '***@' . $emailParts[1];

                return [
                    'id' => $message->id,
                    'sender_initials' => trim($initials),
                    'sender_email_preview' => $anonymizedEmail,
                    'message' => $message->message,
                    'is_from_graduate' => $message->is_from_graduate,
                    'created_at' => $message->created_at,
                ];
            });

        return Inertia::render('PublicGraduateChat', [
            'graduate' => $graduate,
            'messages' => $messages,
            'schoolInfo' => \App\Models\SchoolInfo::first(),
        ]);
    }
}
