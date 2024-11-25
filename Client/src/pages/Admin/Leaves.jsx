import React, { useContext, useState, useEffect } from "react";
import TooltipComp from "@/components/comp/Tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Search, X } from "lucide-react";
import { AdminContext } from "@/context/adminContext";
import moment from "moment";
import LoadingSkeleton from "@/components/comp/LoadingSkeleton";

const Leaves = () => {
  const { getAllLeaves, allLeaveData, employees, departments, manageLeave, isLoading } = useContext(AdminContext);
  const descendingLevaeList = allLeaveData?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const [selectInput, setSelectInput] = useState('pending');
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState(descendingLevaeList);

  // Filter data based on selected status or search input
  const filterData = () => {
    let filtered = descendingLevaeList;

    // Filter by status (approved, pending, rejected)
    if (selectInput !== 'all') {
      filtered = filtered?.filter((item) => item.status === selectInput);
    }

    // Filter by search input (if any)
    if (searchInput) {
      filtered = filtered?.filter((item) => {
        const employeeName = employees?.find(emp => emp._id === item.employeeId)?.name || '';
        return (
          employeeName.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.type.toLowerCase().includes(searchInput.toLowerCase())
        );
      });
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData();
  }, [selectInput, searchInput, allLeaveData]);

  const handleSelect = (value) => {
    setSelectInput(value);
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleApprove = async (id, status) => {
    await manageLeave(id, status);
    getAllLeaves();
  };

  const handleReject = async (id, status) => {
    await manageLeave(id, status);
    getAllLeaves();
  };

  return (
    <div className="w-full h-full p-4 overflow-y-scroll">
      <h1 className="text-2xl font-semibold text-gray-800 mb-5">
        Manage Leaves
      </h1>

      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <Search className="text-black" />
          <Input placeholder="Search here" type="text" className="w-52" value={searchInput} onChange={handleSearch} />
        </div>
        <Select onValueChange={handleSelect} value={selectInput}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <Table className="border">
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="text-black">Sl No.</TableHead>
              <TableHead className="text-black">Emp. Name</TableHead>
              <TableHead className="text-black">Type of Leave</TableHead>
              <TableHead className="text-black">Department</TableHead>
              <TableHead className="text-black">From Date</TableHead>
              <TableHead className="text-black">To Date</TableHead>
              <TableHead className="text-black">Apply Date</TableHead>
              <TableHead className="text-black">Status</TableHead>
              <TableHead className="text-right text-black">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
            filteredData?.length > 0 ?
            filteredData?.map((item, index) => (
              <TableRow key={index} className='h-16'>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{employees?.find(emp => emp._id === item.employeeId)?.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{departments?.find(dept => dept._id === employees?.find(emp => emp._id === item.employeeId).department)?.name}</TableCell>
                <TableCell>{moment(item.fromDate).format('DD-MM-YYYY')}</TableCell>
                <TableCell>{moment(item.todate).format('DD-MM-YYYY')}</TableCell>
                <TableCell>{moment(item.createdAt).format('DD-MM-YYYY')}</TableCell>
                <TableCell>
                  <span className={`py-1 px-2 text-white text-sm rounded-md ${item.status === 'pending' ? 'bg-orange-500' : item.status === 'approved' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {item.status.replace(/^./, item.status[0].toUpperCase())}
                  </span>
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  {item.status === 'pending' && (
                    <>
                      <TooltipComp button={<Button className="bg-green-600" onClick={() => handleApprove(item._id, 'approved')}><Check /></Button>} content="Approve" />
                      <TooltipComp button={<Button variant="destructive" onClick={() => handleReject(item._id, 'rejected')}><X /></Button>} content="Reject" />
                    </>
                  )}          
                </TableCell>
              </TableRow>
            )) : 
            (
              <TableRow>
                <TableCell colSpan={9} className='h-14 text-center text-lg'>No Leave Found</TableCell>
              </TableRow>
            )
          }
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Leaves;
