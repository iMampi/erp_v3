<?php

namespace Salary;

use Salary\IrsaPayable;
use Conge\CongesMonthly;
use Cotisation\SmieData;
use Cotisation\CnapsData;
use Employee\EmployeeBase;
use Cotisation\SmieCotisation;
use Salary\Avantage\Avantages;
use Cotisation\CnapsCotisation;


class SalaryMonthly
{
    public float $sal_base;
    public float $temps;
    public float $sal_prorata;
    public float $prime;
    public Avantages $avantages;
    public float $avantages_imposables;
    public float $sal_brut;
    public float $sal_imposable_avant_cot;
    public float $sal_numeraire;
    public float $allocation_familliale;
    public float $conges_consommes;
    public float $indemnites_conges;
    public string $smie;
    public int $year;
    public int $month;
    public float $cot_cnaps;
    public float $cot_smie;
    public int $nb_enfant;
    public int $reduc_enfant; //0 or 1
    public float $irsa_brut;
    public float $irsa_abattement;
    public float $irsa_net;

    public function __construct(int $year, int $month, EmployeeBase $EmployeeBase, $temps, $prime, $allocation_familliale, CongesMonthly $conges, CnapsData $cnaps_data, SmieData $smie_data)
    {
        $this->year = $year;
        $this->month = $month;
        $this->allocation_familliale = $allocation_familliale;
        $this->sal_base = $EmployeeBase->sal_base;
        $this->temps = $temps;
        $this->prime = $prime;
        $this->smie = $EmployeeBase->smie;
        $this->avantages = $EmployeeBase->avantages;
        $this->nb_enfant = $EmployeeBase->nb_enfant;
        $this->reduc_enfant = $EmployeeBase->reduc_enfant;
        $this->conges_consommes = $conges->conges_consommes;
        $this->indemnites_conges = $conges->indemnites_conges;
        $this->sal_prorata = $this->sal_base * ($temps - $this->conges_consommes) / 30;

        $this->sal_numeraire = $this->sal_prorata + $this->prime + $this->indemnites_conges;

        $this->avantages_imposables = min($this->avantages->montant_imposable, $this->sal_numeraire * 0.2);

        $this->sal_brut = $this->sal_prorata + $this->prime + $this->avantages->montant_brut + $this->indemnites_conges;

        // FIXME: $cnasp et smie data
        $cnaps_ = new CnapsCotisation($this->year, $this->month, $this->sal_brut, $cnaps_data);
        $this->cot_cnaps = $cnaps_->cotisation_employee;
        $smie_ = new SmieCotisation($this->year, $this->month, $this->sal_brut, $smie_data);
        $this->cot_smie = $smie_->cotisation_employee;

        $this->sal_imposable_avant_cot = $this->sal_prorata + $this->prime + $this->avantages->montant_imposable + $this->indemnites_conges;
        -$this->cot_cnaps - $this->cot_smie;

        $irsa_ = new IrsaPayable($this->year, $this->month, $this->sal_imposable_avant_cot, $this->smie, $this->reduc_enfant, $this->nb_enfant);
        $this->irsa_brut = $irsa_->irsa_brut;
        $this->irsa_abattement = $irsa_->abattement_enfant;
        $this->irsa_net = $irsa_->irsa_net;

        $this->sal_net = $this->sal_numeraire - $this->cot_cnaps - $this->cot_smie - $this->irsa_net + $this->allocation_familliale;
    }
}
