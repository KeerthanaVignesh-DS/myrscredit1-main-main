<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Submission>
 */
class SubmissionFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'user_id' => fake()->numberBetween(3, 197), // Random user IDs
            'name' => fake()->name(),
            'address1' => fake()->streetAddress(),
            'address2' => fake()->optional()->secondaryAddress(),
            'city' => fake()->city(),
            'state' => fake()->state(),
            'zip' => fake()->postcode(),
            'country' => fake()->country(),
            'phone' => fake()->phoneNumber(),
            'myrs_product' => fake()->randomElement(['1', '2']),
            'express_service' => fake()->randomElement(['1', '2']),
            'order_amount' => fake()->randomFloat(2, 50, 500), // Amount between 50 and 500
            'chk_previous14' => fake()->boolean(),
            'comments' => fake()->optional()->sentence(),
            'lbl_doc_name1' => fake()->optional()->word(),
            'file_upload_controls1' => fake()->optional()->word(),
            'doc_name1' => fake()->optional()->word(),
            'lbl_doc_name2' => fake()->optional()->word(),
            'file_upload_controls2' => fake()->optional()->word(),
            'doc_name2' => fake()->optional()->word(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'status' => fake()->boolean(),
            'submitted_date' => fake()->optional()->dateTimeBetween('-6 months', 'now'),
            'completed_date' => fake()->optional()->dateTimeBetween('-6 months', 'now'),
            'charge_amt' => fake()->randomFloat(2, 20, 300), // Charge amount between 20 and 300
            'myrs_rating' => fake()->optional()->randomElement(['Excellent', 'Good', 'Average', 'Poor']),
            'secondary_phone' => fake()->optional()->phoneNumber(),
            'additional_address' => fake()->optional()->address(),
            'web' => fake()->optional()->url(),
            'account_status' => fake()->optional()->numberBetween(1, 2),
            'no_of_records' => fake()->optional()->numberBetween(0, 100),
            'no_of_payment_records' => fake()->optional()->numberBetween(0, 100),
            'recent_inquiries1' => fake()->optional()->numberBetween(0, 10),
            'recent_inquiries2' => fake()->optional()->word(),
            'submit_type' => fake()->optional()->randomElement(['submitted', 'Indicated']),
            'amount' => fake()->optional()->numberBetween(100, 1000),
            'historical_pdf' => fake()->optional()->numberBetween(0, 1),
        ];
    }
}
