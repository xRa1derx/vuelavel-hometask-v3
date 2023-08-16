<?php

namespace App\Http\Controllers;

use App\Http\Requests\Mail\MailRequest;
use App\Mail\SendMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailSenderController extends Controller
{
    public function sendMail(MailRequest $request)
    {
        $data = $request->validated();
        Mail::to('alyonaozhered@gmail.com')
            ->send(new SendMail(
                $data['name'],
                $data['phone'],
                $data['city'],
                $data['time']
            ));
    }
}
