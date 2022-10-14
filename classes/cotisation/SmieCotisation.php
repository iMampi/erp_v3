<?php

namespace Cotisation;


class SmieCotisation
{
    public int $year;

    public int $month;

    public float $sal_brut;
    public float $cotisation_employee;
    public float $cotisation_patron;
    public float $rate_employee;
    public float $rate_patron;
    public float $plafond;
    public SmieData $smie_data;

    public function __construct(int $year, int $month, float $sal_brut, SmieData $smie_data)
    {
        $this->year = $year;
        $this->month = $month;
        $this->sal_brut = $sal_brut;
        $this->smie_data = $smie_data;
        $this->get_rates();
        $this->calculate_cotisation();
    }

    public function get_rates()
    {
        $mydate = new \DateTime();
        $mydate->setTimestamp(\mktime(0, 0, 0, $this->month, 1, $this->year));
        $rates = $this->smie_data->get_data($mydate);
        $this->rate_employee = $rates[0];
        $this->rate_patron = $rates[1];
        $this->plafond = $rates[2];
    }

    public function calculate_cotisation()
    {
        $this->cotisation_employee = \min($this->sal_brut * $this->rate_employee, $this->plafond * $this->rate_employee);
        $this->cotisation_patron = \min($this->sal_brut * $this->rate_patron, $this->plafond * $this->rate_patron);
    }
}
