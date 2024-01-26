<?php

namespace App\Http\Controllers\Chat;

use App\Http\Controllers\Controller;
use App\Http\Requests\Chat\ChatMessageRequest;
use App\Http\Resources\ChatMessageResource;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function index()
    {
        $message = Message::with('sender')->where('from', auth()->id())->get();
        return ChatMessageResource::collection($message)->resolve();
    }

    public function store(ChatMessageRequest $request)
    {
        $data = $request->validated();
        if (Auth::user()->id != $request->from) {
            return 'ERROR';
        }
        if (array_key_exists('files', $data)) {
            $files = $data['files'];
            unset($data['files']);
            $message = Message::create($data);
            foreach ($files as $file) {
                $message->uploadFile($file);
            }
        } else if (array_key_exists('images', $data)) {
            $images = $data['images'];
            unset($data['images']);
            $message = Message::create($data);
            foreach ($images as $image) {
                $message->uploadImage($image);
            }
        } else {
            $message = Message::create($data);
        }
        return $message;
    }

    public function show($id)
    {
        $sender = Message::with('sender')->where(['from' => auth()->id(), 'to' => $id])->get();
        $receiver = Message::with('sender')->where(['to' => auth()->id(), 'from' => $id])->get();
        $sortedLastTenMessages = $sender->merge($receiver)->sortBy('id')->reverse()->slice(0, 10);

        return ChatMessageResource::collection($sortedLastTenMessages->values()->all())->resolve();
    }
}
