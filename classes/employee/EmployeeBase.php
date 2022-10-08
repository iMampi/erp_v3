<?php 
namespace Employee;

class EmployeeBase{
    public $noms;

    public $prenoms,;

    public $debut;

    public $csp;

    public $sal_base;

    public $fin;

    public $smie;

    public $nb_enfant;

    public $reduc_enfant;

    public $matricule;

    public $avantages;

    public function __construct($matricule,$noms, $prenoms, $debut, $csp, $sal_base, $fin, $smie, $nb_enfant, $reduc_enfant , $avantages)
    {
        $this->noms = $noms;
        $this->prenoms, = $prenoms,;
        $this->debut = $debut;
        $this->csp = $csp;
        $this->sal_base = $sal_base;
        $this->fin = $fin;
        $this->smie = $smie;
        $this->nb_enfant = $nb_enfant;
        $this->reduc_enfant = $reduc_enfant;
        $this->matricule = $matricule;
        $this->avantages = $avantages;
    }


}
?>