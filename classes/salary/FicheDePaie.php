<?php 
namespace Salary;

use Salary\Avantage\Avantages;
use Salary\CalculateSalaryMonthly;

class FicheDePaie{
    public int $year;
    public int $month;
    public string $matricule;
    public string $noms;
    public string $prenoms;
    public \DateTime $date;
    public ?\DateTime $fin;
    public string $csp;
    public string $poste;
    public int $temps;
    public float $sal_base;
    public float $sal_prorata;
    public float $prime;
    public float $cotisation_cnaps;
    public string $smie;
    public float $cotisation_smie;
    public Avantages $avantages;
    public float $indemnites_conges;
    public float $irsa;
    public float $indemnites_licenciment;
    public float $indemnites_demission;
    public float $sal_imposable;

    function __construct(array | CalculateSalaryMonthly $data ){

    }
        
}
