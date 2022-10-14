<?php 
namespace Employee;

use Salary\Avantage\Avantages;

class EmployeeBase{
    public $noms;

    public $prenoms;

    public $debut;

    public $csp;

    public $sal_base;

    public $fin;

    public $smie;

    public $nb_enfant;

    public int $reduc_enfant; //1 or 0

    public $matricule;

    public $avantages;

    public function __construct($matricule,$noms, $prenoms, $debut, $csp, $sal_base, $fin, $smie, $nb_enfant, $reduc_enfant , array $avantages_arr)
    {
        $this->noms = $noms;
        $this->prenoms = $prenoms;
        $this->debut = $debut;
        $this->csp = $csp;
        $this->sal_base = $sal_base;
        $this->fin = $fin;
        $this->smie = $smie;
        $this->nb_enfant = $nb_enfant;
        $this->reduc_enfant = $reduc_enfant;
        $this->matricule = $matricule;
        $this->avantages = new Avantages($avantages_arr,$this->sal_base);
    }


}
