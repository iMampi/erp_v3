<?php

namespace Salary\Avantage;

class Logement extends Avantage
{
    public float $rate = 0.50;
    protected float $sal_base;

    public function __construct($montant_brut, $sal_base)
    {
        $this->sal_base = \floatval($sal_base);
        parent::__construct($montant_brut);
        $this->calc_plafond();
    }

    public function calc_plafond()
    {
        $this->montant_imposable = min($this->montant_imposable, $this->sal_base * 0.25);
    }
}
