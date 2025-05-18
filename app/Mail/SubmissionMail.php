<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Submission;
use App\Models\User;

class SubmissionMail extends Mailable
{
    use Queueable, SerializesModels;

    public $data;
    public $user;
    public $isadmin;
    
    public function __construct($data,User $user,$isadmin)
    {
        $this->data = $data;
        $this->user = $user;
        $this->isadmin = $isadmin;

    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    { 
        $subject = $this->isadmin ? "New Recommendation Submission" : 'Thank you for Myrs Recommendation Submission.';
        return new Envelope(
            subject: $subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        // dd($this->user);
        $temp = $this->isadmin ?  'emails.RecommendationSubmissionMailToAdmin' : 'emails.RecommendationSubmissionMailToUser';
        return new Content(
            view: $temp,
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
