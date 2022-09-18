<?php

namespace Authorizations;

use Authorizations\Authorization;


class UserAuthorizations
{
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

    function __construct(array $auth_data)
    {
        $data = func_get_arg(0);
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
    }
}