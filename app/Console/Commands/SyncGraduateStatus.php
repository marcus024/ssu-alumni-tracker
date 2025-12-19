<?php

namespace App\Console\Commands;

use App\Models\Graduate;
use App\Models\User;
use Illuminate\Console\Command;

class SyncGraduateStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'graduates:sync-status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync graduate status with user account status';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Syncing graduate and user statuses...');

        // Get all graduates with email addresses
        $graduates = Graduate::whereNotNull('email')->get();
        $synced = 0;
        $notFound = 0;

        foreach ($graduates as $graduate) {
            $user = User::where('email', $graduate->email)->first();

            if ($user) {
                // Sync the status from graduate to user
                if ($user->status !== $graduate->status) {
                    $user->update(['status' => $graduate->status]);
                    $this->line("✓ Synced status for {$graduate->email}: {$graduate->status}");
                    $synced++;
                } else {
                    $this->line("- Already in sync: {$graduate->email}");
                }
            } else {
                $this->warn("✗ No user found for graduate: {$graduate->email}");
                $notFound++;
            }
        }

        $this->newLine();
        $this->info("Sync complete!");
        $this->info("Total graduates processed: {$graduates->count()}");
        $this->info("Statuses synced: {$synced}");
        $this->info("Users not found: {$notFound}");

        return Command::SUCCESS;
    }
}
