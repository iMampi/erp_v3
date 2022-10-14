<?php

namespace Salary\Avantage;

class Avantage
{
    public float $rate = 1;
    protected float $montant_brut;
    protected float $montant_imposable;

    public function __construct($mb)
    {
        $this->montant_brut = $mb;
        $this->montant_imposable = $this->calc_imposable();
    }

    function calc_imposable()
    {
        return $this->montant_brut * $this->rate;
    }

    function get_montant_brut()
    {
        return $this->montant_brut;
    }
    function get_montant_imposable()
    {
        return $this->montant_imposable;
    }
}
