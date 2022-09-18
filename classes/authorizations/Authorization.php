<?php 
namespace Authorizations;
//base class for all Authorization object
class Authorization{
    public int $create;
    public int $read;
    public int $update;
    public int $delete;

    public function __construct(int $create,int $read,int $update, int $delete)
    {
        $this->read =$read;
        $this->create =$create;
        $this->update =$update;
        $this->delete =$delete;
    }
}
?>