<?php

namespace Base;



class DataObjByDate
{
    public array $data;

    public function __construct(array $data)
    {
        $this->data = $data;
        \krsort($this->data);
    }

    public function get_data(string|\DateTime $ref)
    {
        $input = $ref;
        if (gettype($ref) == "string") {
            $input =  \DateTime::createFromFormat("Y-m-d", $ref);
        }

        foreach ($this->data as $key => $value) {
            if ($input >= \DateTime::createFromFormat("Y-m-d", $key)) {
                return $value;
            }
        }
        throw new \Exception("No validate date");
    }
}
