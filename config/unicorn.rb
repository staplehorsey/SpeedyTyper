working_directory "/home/rails/SpeedyTyper"

pid "/var/www/SpeedyTyper/pids/unicorn.pid"

stderr_path "/home/rails/SpeedyTyper/log/unicorn.log"
stdout_path "/home/rails/SpeedyTyper/log/unicorn.log"

listen "/tmp/unicorn.[SpeedyTyper].sock"
listen "/tmp/unicorn.SpeedyTyper.sock"

worker_processes 2
timeout 30
