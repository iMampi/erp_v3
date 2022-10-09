<?php

namespace Salary;

class SmieCotisation
{
    protected $year;

    protected $month;

    protected $sal_brut;
    protected $cotisation_employee;
    protected $cotisation_patron;
    protected $cnaps_data;

    public function __construct($year, $month, $sal_brut,  $smie_data)
    {
        $this->year = $year;
        $this->month = $month;
        $this->sal_brut = $sal_brut;
        $this->cnaps_data = $smie_data;
        $this->rate = $this->get_rate();
        $this->plafond = $this->get_plafond();
        $this->cotisation_employee = $this->calculate_cotisation()[0];
        $this->cotisation_patron = $this->calculate_cotisation()[1];
    }

    protected function get_rate()
    {
    }
    protected function get_plafond()
    {
    }
    protected function calculate_cotisation()
    {
        // return [$cot_emp, $cot_patron];
    }
}
