<?php

namespace Database\Special;

//TODO : deleteme not used anymore
// TODO : a modifier pour protecitn. pour l'instant, c'est juste une simple querry. a mettre en preparedquery
class QueryFilterConditionsConstructor
{
    public string $conditions_string;
    public int $echeance_counter;
    public int $encours_counter;
    function __construct(array $data)
    {
        if (\count($data) > 0) {
            $this->conditions_string = " where ";

            $last_key = \array_key_last($data);

            foreach ($data as $key => $value) {

                switch ($key) {
                    case 'uid':
                    case 'nom-commercial':
                    case 'raison-sociale':
                    case 'noms':
                    case 'prenoms':
                    case 'cin':
                    case 'cin-date':
                    case 'cin-lieu':
                    case 'naissance-date':
                    case 'naissance-lieu':
                    case 'adress':
                    case 'nif':
                    case 'stat':
                    case 'rcs':
                    case 'note':
                        $this->conditions_string .= " $key LIKE '%$value%'and";
                        break;

                    case 'personnality':
                    case 'actif':
                    case 'type-vente':
                    case 'evaluation':
                    case 'declarable':
                    case 'commisionable':

                        if ($value != "all") {

                            $this->conditions_string .= " $key = $value and";
                        }

                        break;
                    case 'phone':
                        $this->conditions_string .= " phone1 LIKE '%$value%' and";
                        $this->conditions_string .= " or phone2 LIKE '%$value%' and";
                        break;

                    case 'mail':
                        $this->conditions_string .= " mail1 LIKE '%$value%' and";
                        $this->conditions_string .= " or mail2 LIKE '%$value%' and";
                        break;

                    case 'echeance-min':
                    case 'echeance-max':
                        if ($this->echeance_counter > 0) {
                            $mymin = $data['echeance-min'];
                            $mymax = $data['echeance-max'];
                            if ((\intval($mymin) == 0) && (\intval($mymax) == 0)) {
                                $this->conditions_string .= " nb_jour = 0 and";
                            } elseif ((\intval($mymin) >= 0) && (\intval($mymax) > 0)) {
                                $this->conditions_string .= " nb_jour BETWEEN $mymin AND $mymax and";
                            } elseif ((\intval($mymin) > 0) && (\intval($mymax) == 0)) {
                                $this->conditions_string .= " nb_jour > $mymin and";
                            } elseif ((\intval($mymin) > 0) && (\intval($mymax) == 0)) {
                                $this->conditions_string .= " nb_jour > $mymin and";
                            };
                        }
                        break;

                    case 'encours-min':
                    case 'encours-max':
                        if ($this->encours_counter > 0) {

                            $mymin = $data['encours-min'];
                            $mymax = $data['encours-max'];
                            if ((\intval($mymin) == 0) && (\intval($mymax) == 0)) {
                                $this->conditions_string .= " encours = 0 and";
                            } elseif ((\intval($mymin) >= 0) && (\intval($mymax) > 0)) {
                                $this->conditions_string .= " encours BETWEEN $mymin AND $mymax and";
                            } elseif ((\intval($mymin) > 0) && (\intval($mymax) == 0)) {
                                $this->conditions_string .= " encours > $mymin and";
                            } elseif ((\intval($mymin) > 0) && (\intval($mymax) == 0)) {
                                $this->conditions_string .= " encours > $mymin and";
                            };
                        }
                        break;
                }
                if ($key == $last_key) {
                    $this->conditions_string = \preg_replace('/\s*and\s*$/', "", $this->conditions_string);
                }
            }
        }
    }
}
