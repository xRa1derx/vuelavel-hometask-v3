<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class ChatMessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'message' => $this->message,
            'new' => $this->new,
            'replyMessage' => $this->replyMessage,
            'sender' => UserResource::make(User::findOrFail($this->from)),
            'reciever' => UserResource::make(User::findOrFail($this->to)),
            'created_at' => $this->created_at,
            'created_at_for_humans' => $this->created_at->diffForHumans(),
            'files' => FileResource::collection($this->files),
            'images' => ImageResource::collection($this->images)
        ];
    }
}
