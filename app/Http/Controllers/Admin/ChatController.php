<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ChatMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ChatController extends Controller
{
    public function index(): Response
    {
        $messages = ChatMessage::with('user')
            ->latest()
            ->take(100)
            ->get()
            ->reverse()
            ->values();

        return Inertia::render('Admin/Chat', [
            'messages' => $messages,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        ChatMessage::create([
            'user_id' => auth()->id(),
            'message' => $validated['message'],
            'is_read' => false,
        ]);

        return redirect()->route('admin.chat.index');
    }
}
