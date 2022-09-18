<?php

namespace Session;

use Authorizations\UserAuthorizations;

class User
{

    public UserAuthorizations $authorizations;
    public int $uid;
    public string $name;

    function __construct(int $uid, string $name, array $auth_data)
    {
        $this->uid = $uid;
        $this->name = $name;
        $this->authorizations = new UserAuthorizations($auth_data);
    }
}