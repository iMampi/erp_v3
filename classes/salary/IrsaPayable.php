<?php

namespace Salary;

class IrsaPayable
{
    protected float $min_irsa = 3000;
    protected float $year;
    protected float $month;
    protected float $taux_reduc = 2000;
    public float $sal_brut;
    public float $sal_imposable_apres_cot;
    public float $sal_brut_avant_cot;
    public int $reduc_enfant;
    public int $nb_enfant;
    public float $abattement_enfant;
    public float $irsa_net;
    public int $smie = 0;


    public function __construct($year, $month, $sal_imposable_avant_cot, $smie, $reduc_enfant, int $nb_enfant)
    {

        $this->sal_brut_avant_cot = $sal_imposable_avant_cot;
        $this->year = $year;
        $this->month = $month;
        $this->reduc_enfant = $reduc_enfant;
        $this->nb_enfant = $nb_enfant;
        if ($smie) {
            $this->smie += 1;
        }
        $this->sal_imposable_apres_cot = $this->sal_brut_avant_cot * (1 + $this->smie);
        $this->abattement_enfant=$this->nb_enfant * $this->taux_reduc * $this->reduc_enfant;
        $this->calc_irsa();
    }

    public function calc_irsa()
    {
        $result_ = 0;
        if (($this->sal_imposable_apres_cot > 350000) && ($this->sal_imposable_apres_cot <= 400000)) {
            $result_ = ($this->sal_imposable_apres_cot - 350000) * 0.05;
        } elseif (($this->sal_imposable_apres_cot > 400000) && ($this->sal_imposable_apres_cot <= 500000)) {
            $result_ = ($this->sal_imposable_apres_cot - 400000) * 0.10 + (50000 * 0.05);
        } elseif (($this->sal_imposable_apres_cot > 500000) && ($this->sal_imposable_apres_cot <= 600000)) {
            $result_ = ($this->sal_imposable_apres_cot - 500000) * 0.15 + (100000 * 0.10) + (50000 * 0.05);
        } elseif ($this->sal_imposable_apres_cot > 600000) {
            $result_ = ($this->sal_imposable_apres_cot - 600000) * 0.20 + (100000 * 0.15) + (100000 * 0.10) + (50000 * 0.05);
        }
        $this->irsa_brut = \max($result_, $this->min_irsa);
        $this->irsa_net = \max($this->irsa_brut - $this->abattement_enfant, $this->min_irsa);
    }
}
