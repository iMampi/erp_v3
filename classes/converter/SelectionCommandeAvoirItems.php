<?php
// FIXME : c'est redondant avec newclient. on peut amméliorer
// declare(strict_types=1);

namespace Converter;

class SelectionCommandeAvoirItems extends SelectionCommandeItems
{
    function __construct(array $data)
    {
        parent::__construct($data);
    }
}
