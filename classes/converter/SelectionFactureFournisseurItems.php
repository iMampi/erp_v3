<?php
// FIXME : c'est redondant avec newclient. on peut amméliorer
// declare(strict_types=1);

namespace Converter;

class SelectionFactureFournisseurItems extends Converter
{
    function __construct(array $data)
    {
        parent::__construct($data);
        $this->converter_for_db();
    }

    public function converter_for_db()
    {

        $this->data_for_db["facture_uid"] = \intval($this->data_from_user["facture-uid"]);
    }
}
