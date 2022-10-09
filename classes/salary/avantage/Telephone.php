<?php

namespace Salary\Avantage;

class Telephone extends Avantage
{
    public float $rate = 0.15;

    public function __construct($montant_brut)
    {
        parent::__construct($montant_brut);
    }
}
