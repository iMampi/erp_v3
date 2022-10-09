<?php

namespace Salary\Avantage;

use Salary\Avantage\Avantage;
use Salary\Avantage\Logement;
use Salary\Avantage\Telephone;
use Salary\Avantage\Vehicule;

class Avantages
{
    public array $details = [];
    public float $montant_brut = 0;
    public float $montant_imposable = 0;
    public float $plafond = 0;
    //plafond 20% des rémunératoin brute en numéraires 
    //TODO : vérifier texte pour plus de précision

    public function __construct(array $data, float $sal_base)
    {
        if (!empty($data)) {
            foreach ($data as $key => $value) {
                switch ($value[0]) {
                    case 'logement':
                        $this->details[$key] = new Logement(\floatval($value[1]), $sal_base);
                        break;
                    case 'telephone':
                        $this->details[$key] = new Telephone(\floatval($value[1]));
                        break;
                    case 'vehicule':
                        $this->details[$key] = new Vehicule(\floatval($value[1]));
                        break;
                    default:
                        $this->details[$key] = new Avantage(\floatval($value[1]));
                        break;
                }
            }
            $this->calc_brut();
            $this->calc_imposable();
        }
    }

    function calc_brut()
    {
        foreach ($this->details as $name => $obj) {
            $this->montant_brut += $obj->get_montant_brut();
        }
    }
    function calc_imposable()
    {
        foreach ($this->details as $name => $obj) {
            $this->montant_imposable += $obj->get_montant_imposable();
        }
    }
}
