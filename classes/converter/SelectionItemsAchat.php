<?php
// FIXME : c'est redondant avec newclient. on peut amméliorer
// declare(strict_types=1);

namespace Converter;

use Converter\SelectionItems;
use Database\Special\QueryFilterConditionsConstructor;

class SelectionItemsAchat extends SelectionItems
{

    function __construct(array $data)
    {
        parent::__construct($data);
    }

    public function generate_conditions()
    {
        parent::generate_conditions();
        $this->conditions .= " and pour_achat='1'";
    }
}
