<?php 
namespace Salary\Avantage;


class Vehicule extends Avantage{
    protected float $rate=0.15;

    public function __construct($montant_brut)
    {
        parent::__construct($montant_brut);
    }


}
