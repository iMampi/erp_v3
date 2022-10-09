<?php

namespace Salary;

class IrsaPayable
{
    protected float $min_irsa = 3000;
    protected float $year;
    protected float $month;
    protected float $taux_reduc = 2000;
    public float $sal_imposable;
    public float $irsa_brut;
    public int $reduc_enfant;
    public float $nb_enfant;
    public float $abattement_enfant;
    public float $irsa_net;


    public function __construct($year, $month, $sal_imposable, $reduc_enfant, $nb_enfant)
    {
        $this->sal_imposable = $sal_imposable;
        $this->year = $year;
        $this->month = $month;
        $this->calc_irsa();
    }

    public function calc_irsa()
    {   
        $result_=0;
        if(($this->sal_imposable>350000)&&($this->sal_imposable<=400000)){
            $result_=($this->sal_imposable-350000)*0.05;
        }elseif (($this->sal_imposable>400000)&&($this->sal_imposable<=500000)) {
            $result_=($this->sal_imposable-400000)*0.10+(50000*0.05);
        }elseif (($this->sal_imposable>500000)&&($this->sal_imposable<=600000)) {
            $result_=($this->sal_imposable-500000)*0.15+(100000*0.10)+(50000*0.05);
        }elseif($this->sal_imposable>600000){
            $result_=($this->sal_imposable-600000)*0.20+(100000*0.15)+(100000*0.10)+(50000*0.05);
        }
        $this->irsa_brut=\max($result_,$this->min_irsa);
        $this->irsa_net=\max($this->irsa_brut-($this->nb_enfant*$this->taux_reduc*$this->reduc_enfant),$this->min_irsa);
    }
}
