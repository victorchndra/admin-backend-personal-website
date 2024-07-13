<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request) {
        // validate
        $fields = $request->validate([
            'username' => 'required|max:30',
            'password' => 'required'
        ]);
        // dd($fields);

        // trying to login the user
        if(Auth::attempt($fields, $request->remember)) {
            $request->session()->regenerate();

            return redirect()->route('dashboard.index');
        } else {
            return back()->withErrors([
                'failed' => 'The user credentials do not match our records'
            ]);
        };
    }

    public function logout(Request $request) {
        // logout the user
        Auth::logout();

        // invalidate user's session
        $request->session()->invalidate();

        // regenerate CSRF token
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
