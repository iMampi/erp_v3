<?php 
namespace Salary;

use Employee\EmployeeBase;

class MonthSalary{

    $sal_base;
    $temps;
    $sal_prorata;
    $prime;
    $avantages:
    $sal_brut;
    $sal_imposable;
    $allocation_famillials;
    $conges_consommes;
    $indemnites_conges;
    $cot_cnaps;
    $smie;
    int $year;
    int $month;
    $cot_cnaps;
    $cot_smie;
    $nb_enfant;
    $reduc_enfant;

    public function __construct(int $year,int $month,EmployeeBase $EmployeeBase,$temps,$prime,$allocation_familliale,Conges $conges)
    {
        $this->sal_base = $EmployeeBase->sal_base;
        $this->temps = $temps;
        $this->prime = $prime;
        $this->avantages = $avantages;
        $this->nb_enfant=$EmployeeBase->nb_enfant;
        $this->reduc_enfant=$EmployeeBase->reduc_enfant;
        $this->conges_consommes = $conges_consommes;
        $this->indemnites_conges = $indemnites_conges;
        $this->sal_prorata = $this->sal_base*($temps-$this->conges_consommes)/30;
        $this->sal_brut = $this->sal_base+$this->prime+$this->avantages+$this->indemnites_conges;

        $this->cot_cnaps=new CnapsCotisation($this->year,$this->month,$this->sal_brut,$cnaps_data);
        $this->cot_smie=new SmieCotisation($this->year,$this->month,$this->sal_brut,$smie_data);

        $this->sal_imp = $this->sal_brut-$this->cot_cnaps-$this->cot_smie;
        
        $irsa_=new IrsaPayable();
        $this->irsa_brut= $irsa_[0];
        $this->irsa_abattement=$this->nb_enfant*$this->reduc_enfant*$taux_abattement_enfant;
        $this->irsa_net= $irsa_[1];

        $this->sal_net=$this->sal_prorata+$this->prime+$this->indemnites_conges-$this->cot_cnaps-$this->cot_smie-$this->irsa_net;
    }
}
// 
?>