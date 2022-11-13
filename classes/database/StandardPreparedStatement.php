<?php

// declare(strict_types=1);

namespace Database;

use Database\Queries;
use Database\Bindings;

class StandardPreparedStatement
{
    public string $query;
    public array $binding;
    function __construct(Queries $queries, ?Bindings $bindings)
    {
        $this->query = $queries->query;
        if ($bindings) {

            $this->binding = $bindings->binding;
        } else {
            $this->binding = [];
        }
    }
}
