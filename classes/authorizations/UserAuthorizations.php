<?php

namespace Authorizations;

use Authorizations\Authorization;
use Exception;

class UserAuthorizations
{
    public int $length = 76;
    public int $active;
    public Authorization $client;
    public Authorization $fournisseur;
    public Authorization $facture_client;
    public Authorization $facture_fournisseur;
    public Authorization $tresorerie;
    public Authorization $stock;
    public Authorization $famille;
    public Authorization $categorie;
    public Authorization $item;
    public Authorization $employee;
    public Authorization $authorization;
    public Authorization $affaire;
    public Authorization $devis;
    public Authorization $avoir_client;
    public Authorization $mvt_treso;
    public Authorization $nd_client;
    public Authorization $mvt_interne;
    public Authorization $magasin;
    public Authorization $commande;

    function __construct(array $auth_data)
    {
        // TODO : chager en affectation auto par 4
        $data = func_get_arg(0);
        if ($this->length != count($data)) {
            throw new Exception("data entered is not the correct size");
        }
        for ($i = 0; $i < count($data); $i++) {
            $data[$i] = intval($data[$i]);
        }
        $this->active = $data[0];
        $this->client = new Authorization(
            $data[1],
            $data[2],
            $data[3],
            $data[4]
        );
        $this->fournisseur = new Authorization(
            $data[5],
            $data[6],
            $data[7],
            $data[8]
        );
        $this->facture_client = new Authorization(
            $data[9],
            $data[10],
            $data[11],
            $data[12]
        );
        $this->facture_fournisseur = new Authorization(
            $data[13],
            $data[14],
            $data[15],
            $data[16],
        );
        $this->tresorerie = new Authorization(
            $data[17],
            $data[18],
            $data[19],
            $data[20]
        );
        $this->stock = new Authorization(
            $data[21],
            $data[22],
            $data[23],
            $data[24]
        );
        $this->famille = $this->stock = new Authorization(
            $data[25],
            $data[26],
            $data[27],
            $data[28]
        );
        $this->categorie = new Authorization(
            $data[29],
            $data[30],
            $data[31],
            $data[32]
        );
        $this->item = new Authorization(
            $data[33],
            $data[34],
            $data[35],
            $data[36]
        );
        $this->employee = new Authorization(
            $data[37],
            $data[38],
            $data[39],
            $data[40]
        );
        $this->authorization = new Authorization(
            $data[41],
            $data[42],
            $data[43],
            $data[44]
        );
        $this->affaire = new Authorization(
            $data[45],
            $data[46],
            $data[47],
            $data[48]
        );
        $this->devis = new Authorization(
            $data[49],
            $data[50],
            $data[51],
            $data[52]
        );
        $this->avoir_client = new Authorization(
            $data[53],
            $data[54],
            $data[55],
            $data[56]
        );
        $this->mvt_treso = new Authorization(
            $data[57],
            $data[58],
            $data[59],
            $data[60]
        );
        $this->nd_client = new Authorization(
            $data[61],
            $data[62],
            $data[63],
            $data[64]
        );
        $this->mvt_interne = new Authorization(
            $data[65],
            $data[66],
            $data[67],
            $data[68]
        );
        $this->magasin = new Authorization(
            $data[69],
            $data[70],
            $data[71],
            $data[72]
        );
        $this->commande = new Authorization(
            $data[73],
            $data[74],
            $data[75],
            $data[76]
        );
    }
}
