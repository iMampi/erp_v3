<?php

use Authorizations\UserAuthorizations;
use Variables\Activities;
use Variables\Cycles;

function authorized(UserAuthorizations $user_autho_obj,$cycle,$activity){
    if ((in_array($cycle,Cycles::$cycles)) && (in_array($activity,Activities::$activities))){
        if(($user_autho_obj->active==1)&&($user_autho_obj->$cycle->$activity==1)){
            return true;
        }
    }
    return false;
}