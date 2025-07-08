import HomePage from './Components/Dashboard/HomePage';
import Login from './Pages/Login/Login';
import UserMaster from './Pages/Master/UserMaster';
import RoleMasterForm from './Pages/Master/RoleMaster/RoleMasterForm';
import RoleMaster from './Pages/Master/RoleMaster/RoleMaster';
import DutyMaster from './Pages/Master/DutyMaster/DutyMaster';
import DutyMasterForm from './Pages/Master/DutyMaster/DutyMasterForm';
import ParameterMaster from './Pages/Master/ParameterMaster/ParameterMaster';
import ParameterValueMaster from './Pages/Master/ParameterMaster/ParameterValueMaster';
import TableComponent from './Pages/DataTable';
import DocumentMaster from './Pages/Master/DocumentMaster/DocumentMaster';
import DocumentMasterForm from './Pages/Master/DocumentMaster/DocumentMasterForm';
import OmrMaster from './Pages/Master/OmrMaster/OmrMaster';
import CutOffMaster from './Pages/Master/CutOffMaster/CutOffMaster';
import MeasurementMaster from './Pages/Master/MeasurementMaster/MeasurementMaster';
import LanguageSelector from './Pages/Master/LanguageSelector';
import EventMaster from './Pages/Master/EventMaster/EventMaster';
import AddEventParameter from './Pages/Master/EventMaster/AddEventParameter';
import RfidMaster from './Pages/Master/RfidMaster/RfidMaster';
import ScheduleMaster from './Pages/Master/ScheduleMaster/ScheduleMaster';
import OmrUpload1 from './Pages/Master/OmrUpload1/OmrUpload1';
import StudentMaster from './Pages/Master/StudentMaster/StudentMaster';

const routes = [
    { path: '/', exact: true, name: 'Login', element: Login },
    { path: '/', exact: true, name: 'HomePage', element:HomePage },
    { path: '/dashboard', exact: true, name: 'Dashboard', element: HomePage },
    { path: '/userMaster', name: 'User Master', element: UserMaster },
    { path: '/roleMaster', name: 'Role Master', element: RoleMaster },
    { path: '/roleMasterForm', name: 'Role Master Form', element: RoleMasterForm },
    { path: '/dutyMaster', name: 'Duty Master', element: DutyMaster },
    { path: '/dutyMasterForm', name: 'Duty Master Form', element: DutyMasterForm },
    { path: '/documentMaster', name: 'Document Master', element: DocumentMaster },
    { path: '/documentMasterForm', name: 'Document Master Form', element: DocumentMasterForm },
    { path: '/parameterMaster', name: 'Parameter Master', element: ParameterMaster },
    { path: '/parameterValueMaster', name: 'Parameter Value Master', element: ParameterValueMaster },
    { path: '/dataTable', name: 'DataTable', element: TableComponent },
    { path: '/omrMaster', name: 'OMR Master', element: OmrMaster },
    { path: '/cutOffMaster', name: 'CutOffMaster', element: CutOffMaster },
    { path: '/measurementMaster', name: 'Measurement Master', element: MeasurementMaster },
    { path: '/addEventParameter', name: 'AddEventParameter', element: AddEventParameter },
    { path: '/languageSelector', name: 'Language Selector', element: LanguageSelector },
    { path: '/eventMaster', name: 'Event Master', element: EventMaster },
    { path: '/rfidMaster', name: 'Rfid Master', element: RfidMaster },
    { path: '/scheduleMaster', name: 'ScheduleMaster', element: ScheduleMaster },
    { path: '/omrUpload1', name: 'OmrUpload1', element: OmrUpload1 },
    { path: '/studentMaster', name: 'Student Master', element: StudentMaster },
]
export default routes