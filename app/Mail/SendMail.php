<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendMail extends Mailable
{
    use Queueable, SerializesModels;
    public $name;
    public $phone;
    public $city;
    public $time;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($name, $phone, $city, $time)
    {
        $this->name = $name;
        $this->phone = $phone;
        $this->city = $city;
        $this->time = $time;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('mail')->subject('myhometask');
    }
}
