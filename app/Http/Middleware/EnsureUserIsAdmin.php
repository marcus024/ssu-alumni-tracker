<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user() || !$request->user()->isAdmin()) {
            // Redirect to graduate dashboard if user is not admin
            if ($request->user() && $request->user()->isGraduate()) {
                return redirect()->route('graduate.dashboard');
            }

            // Redirect to home if not logged in or no role
            return redirect('/');
        }

        return $next($request);
    }
}
