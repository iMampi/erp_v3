<?php 
namespace Database;

class Saver{
    // Class to hold all query that saves data
    public DbHandler $connection;

    function __construct(DbHandler $connection){
        $this->connection=$connection;
    }

    function execute_prepared_statement(string $query){
        $stmt = $connection->stmt_init();
        
    }
}
?>