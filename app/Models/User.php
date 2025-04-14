<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Submission;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.   
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name' ,
        'username' ,
        'email' ,
        'password' ,
        'security_question' ,
        'security_answer' ,
        'company',
        'title' ,
        'address1' ,
        'address2',
        'city',
        'state',
        'zip' ,
        'country',
        'ap_email',
        'phone',
        'fax' ,
        'is_admin',
        'is_copy',
        'status',
        'is_active',
        'billing_password',
        'show_password',
        'account_number',
        'price_level'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function submissions()
    {
        return $this->hasMany(Submission::class);
    }
    public function latestSubmission()
    {
        return $this->hasOne(Submission::class)->latestOfMany('submitted_date');
    }
}
