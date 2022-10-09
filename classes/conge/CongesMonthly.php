<?php

namespace Conge;

class CongesMonthly
{
    public float $base; //sal_brute des 12 dernieres moi/12
    public float $conges_consommes;
    public float $indemnites_conges;
    public int $year;
    public int $month;
    // TODO : historique des conges du mois, then juste the counts.
    public function __construct($year, $month, $base, $conges_consommes,)
    {
        $this->year = $year;
        $this->month = $month;
        $this->base = $base;
        $this->conges_consommes = $conges_consommes;
        $this->indemnites_conges = $base / 24 * $this->conges_consommes;
    }
}
