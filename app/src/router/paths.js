// import HomeMeeting from "../views/meetings/Home";
const HomeMeeting = () => import(/* webpackChunkName: "pubg" */ '../views/meetings/Home');

// import HomeMeetingDetail from "../views/meetings/Detail";
const HomeMeetingDetail = () => import(/* webpackChunkName: "home-meeting-detail" */ '../views/meetings/Detail');

// import MeetingDetailContent from "../views/meetings/MeetingDetailContent";
const MeetingDetailContent = () => import(/* webpackChunkName: "home-meeting-detail-content" */ '../views/meetings/MeetingDetailContent');

// import HomeNotebook from "../views/notebooks/Home";
const HomeNotebook = () => import(/* webpackChunkName: "home-notebook" */ '../views/notebooks/Home');

// import ListNotebook from "../views/notebooks/List";
const ListNotebook = () => import(/* webpackChunkName: "list-notebook" */ '../views/notebooks/List');

// import HomeProject from "../views/projects/Home";
const HomeProject = () => import(/* webpackChunkName: "home-project" */ '../views/projects/Home');

// import ProjectHomeMeeting from "../views/projects/meeting/Home";
const ProjectHomeMeeting = () => import(/* webpackChunkName: "project-home-meeting" */ '../views/projects/meeting/Home');

// import ProjectMeetingAgenda from "../views/projects/meeting/Agenda";
const ProjectMeetingAgenda = () => import(/* webpackChunkName: "project-meeting-agenda" */ '../views/projects/meeting/Agenda');

// import ProjectMeetingWeekly from "../views/projects/meeting/Weekly";
const ProjectMeetingWeekly = () => import(/* webpackChunkName: "project-meeting-weekly" */ '../views/projects/meeting/Weekly');

// import NotFound404 from "../views/helpers/NotFound404";
const NotFound404 = () => import(/* webpackChunkName: "not-found" */ '../views/helpers/NotFound404');

// import ReportTimeTracking from "../views/report/Home";
const ReportTimeTracking = () => import(/* webpackChunkName: "report-time-tracking" */ '../views/report/Home');

// import HomeTask from "../views/tasks/Home";
const HomeTask = () => import(/* webpackChunkName: "home-task" */ '../views/tasks/Home');

// import CreatePrivateMessage from "../views/private-message/CreatePrivateMessage";
const CreatePrivateMessage = () => import(/* webpackChunkName: "create-private-message" */ '../views/private-message/CreatePrivateMessage');

// import KitchenSink from "../views/KitchenSink";
const KitchenSink = () => import(/* webpackChunkName: "kitchensink" */ '../views/KitchenSink');

// import Detail from "../views/projects/Detail";
const Detail = () => import(/* webpackChunkName: "detail" */ '../views/projects/Detail');


// import AnnouncementHome from "../views/announcement/Home";
const AnnouncementHome = () => import(/* webpackChunkName: "announcement-home" */ '../views/announcement/Home');

// import NotebookDetailLayout from "../components/layouts/NotebookDetail";
const NotebookDetailLayout = () => import(/* webpackChunkName: "notebook-detail-layout" */ '../components/layouts/NotebookDetail');

// import ProjectTimeEntry from "../views/projects/TimeEntry";
const ProjectTimeEntry = () => import(/* webpackChunkName: "project-time-entry" */ '../views/projects/TimeEntry');

// import NotebookDetail from "../views/notebooks/Detail";
const NotebookDetail = () => import(/* webpackChunkName: "NotebookDetail" */ '../views/notebooks/Detail');

// import KitchenSink2 from "../views/KitchenSink2";
const KitchenSink2 = () => import(/* webpackChunkName: "KitchenSink2" */ '../views/KitchenSink2');

// import KitchenSink3 from "../views/KitchenSink3";
const KitchenSink3 = () => import(/* webpackChunkName: "KitchenSink3" */ '../views/KitchenSink3');

// import KitchenSink8 from "../views/KitchenSink8";
const KitchenSink8 = () => import(/* webpackChunkName: "KitchenSink8" */ '../views/KitchenSink8');

// import FilingRoomDetail from "../views/projects/filing-room/Detail";
const FilingRoomDetail = () => import(/* webpackChunkName: "FilingRoomDetail" */ '../views/projects/filing-room/Detail');

// import FilingRoom from "../views/projects/filing-room/Home";
const FilingRoom = () => import(/* webpackChunkName: "FilingRoom" */ '../views/projects/filing-room/Home');

// import Exhibits from "../views/projects/exhibits/Home";
const Exhibits = () => import(/* webpackChunkName: "Exhibits" */ '../views/projects/exhibits/Home');

// import Taskboard from "../views/projects/taskboard/Home";
const Taskboard = () => import(/* webpackChunkName: "Taskboard" */ '../views/projects/taskboard/Home');

// import HomeBoard from "../views/projects/taskboard/HomeBoard";
const HomeBoard = () => import(/* webpackChunkName: "HomeBoard" */ '../views/projects/taskboard/HomeBoard');
const HomeTaskBoard = () => import(/* webpackChunkName: "HomeTaskBoard" */ '../donga/views/taskboard/HomeTaskBoard');
const DetailTaskBoard = () => import(/* webpackChunkName: "DetailTaskBoard" */ '../donga/views/taskboard/DetailTaskBoard');

// import CardDetail from "../views/projects/taskboard/CardDetail";
const CardDetail = () => import(/* webpackChunkName: "CardDetail" */ '../views/projects/taskboard/CardDetail');

// import ExhibitsDetail from "../views/projects/exhibits/Detail";
const ExhibitsDetail = () => import(/* webpackChunkName: "ExhibitsDetail" */ '../views/projects/exhibits/Detail');

// import Signature from "../views/projects/signature/Home";
const Signature = () => import(/* webpackChunkName: "Signature" */ '../views/projects/signature/Home');

// import Setting from "../views/setting/Home";
const Setting = () => import(/* webpackChunkName: "Signature" */ '../views/setting/Home');

// import Contacts from "../views/projects/contacts/Home";
const Contacts = () => import(/* webpackChunkName: "Contacts" */ '../views/projects/contacts/Home');

// import ContactDetail from "../views/projects/contacts/Detail";
const ContactDetail = () => import(/* webpackChunkName: "ContactDetail" */ '../views/projects/contacts/Detail');

// import WikiProjectDetail from "../views/projects/wiki/Home";
const WikiProjectDetail = () => import(/* webpackChunkName: "WikiProjectDetail" */ '../views/projects/wiki/Home');

// import ProjectDiscussion from "../views/projects/discussion/Home";
const ProjectDiscussion = () => import(/* webpackChunkName: "ProjectDiscussion" */ '../views/projects/discussion/Home');

// import ProjectOverviewResources from "../views/projects/overview/Resources";
const ProjectOverviewResources = () => import(/* webpackChunkName: "ProjectOverviewResources" */ '../views/projects/overview/Resources');

// import ProjectOverviewResourcesProject from "../views/projects/overview/ResourcesProject";
const ProjectOverviewResourcesProject = () => import(/* webpackChunkName: "ProjectOverviewResourcesProject" */ '../views/projects/overview/ResourcesProject');

// import ProjectOverviewResourcesTeam from "../views/projects/overview/ResourcesTeam";
const ProjectOverviewResourcesTeam = () => import(/* webpackChunkName: "ProjectOverviewResourcesTeam" */ '../views/projects/overview/ResourcesTeam');

// import KitchenSink4 from "../views/KitchenSink4";
const KitchenSink4 = () => import(/* webpackChunkName: "KitchenSink4" */ '../views/KitchenSink4');

// import KitchenSink5 from "../views/KitchenSink5";
const KitchenSink5 = () => import(/* webpackChunkName: "KitchenSink5" */ '../views/KitchenSink5');

// import KitchenSink6 from "../views/KitchenSink6";
const KitchenSink6 = () => import(/* webpackChunkName: "KitchenSink6" */ '../views/KitchenSink6');

// import KitchenSink7 from "../views/KitchenSink7";
const KitchenSink7 = () => import(/* webpackChunkName: "KitchenSink7" */ '../views/KitchenSink7');

// import AdminSetting from "../views/setting/HomeAdmin";
const AdminSetting = () => import(/* webpackChunkName: "AdminSetting" */ '../views/setting/HomeAdmin');

// import PrivateMessage from "../views/private-message/PrivateMessage";
const PrivateMessage = () => import(/* webpackChunkName: "PrivateMessage" */ '../views/private-message/PrivateMessage');

// import PrivateMessageRealtime from "../components/messages/PrivateMessageRealtime";
const PrivateMessageRealtime = () => import(/* webpackChunkName: "PrivateMessageRealtime" */ '../components/messages/PrivateMessageRealtime');

// import DiscussionThread from "../components/messages/DiscussionThread.vue";
const DiscussionThread = () => import(/* webpackChunkName: "DiscussionThread" */ '../components/messages/DiscussionThread');

// import CreateNewProject from "../views/projects/CreateProject";
const CreateNewProject = () => import(/* webpackChunkName: "CreateNewProject" */ '../views/projects/CreateProject');

// Hi, sign in to your company
// import Index from "../donga/views/Index";
const Index = () => import(/* webpackChunkName: "Index" */ '../donga/views/Index');

// import SignIn from "../donga/views/auth/SignIn";
const SignIn = () => import(/* webpackChunkName: "SignIn" */ '../donga/views/auth/SignIn');

// import CreateProject from "../donga/views/auth/CreateWorkSpace";
const CreateProject = () => import(/* webpackChunkName: "CreateProject" */ '../donga/views/auth/CreateWorkSpace');

// import ResetPassword from "../donga/views/auth/ResetPassword";
const ResetPassword = () => import(/* webpackChunkName: "ResetPassword" */ '../donga/views/auth/ResetPassword');

// import ChangePassword from "../donga/views/auth/ResetPasswordConfirm";
const ChangePassword = () => import(/* webpackChunkName: "ChangePassword" */ '../donga/views/auth/ResetPasswordConfirm');

// import SetSubdomainToken from "../donga/components/auth/SetSubdomainToken";
const SetSubdomainToken = () => import(/* webpackChunkName: "SetSubdomainToken" */ '../donga/components/auth/SetSubdomainToken');

// import InviteMembers from "../donga/views/auth/InviteMembers";
const InviteMembers = () => import(/* webpackChunkName: "InviteMembers" */ '../donga/views/auth/InviteMembers');

// import JoinInvite from "../donga/views/auth/JoinInvite";
const JoinInvite = () => import(/* webpackChunkName: "JoinInvite" */ '../donga/views/auth/JoinInvite');

// import DashBoard from "../donga/views/dashboard/DashBoard";
const DashBoard = () => import(/* webpackChunkName: "DashBoard" */ '../donga/views/dashboard/DashBoard');

// donga
// import from '../donga/views/project/ProjectOverView'
const ProjectOverView = () => import(/* webpackChunkName: "project-overview" */ '../donga/views/project/ProjectOverView');
const Profile = () => import(/* webpackChunkName: "Profile" */ '../donga/views/account/Profile');
const AccountProfile = () => import(/* webpackChunkName: "AccountProfile" */ '../donga/views/account/AccountProfile');
const TwoFactorAuthenticator = () => import(/* webpackChunkName: "TwoFactorAuthenticator" */ '../donga/views/account/TwoFactorAuthenticator');
const ManagerMemberWorkSpace = () => import(/* webpackChunkName: "ManagerMemberWorkSpace" */ '../donga/views/account/ManagerMemberWorkSpace');


const LAYOUT = {
  NotLoggedIn: "NotLoggedIn",
  Project: "ProjectLoggedIn"
};
export default [
  {path: "*", component: NotFound404},
  {
    path: "/",
    name: "index",
    component: Index,
    // meta: {layout: LAYOUT.NotLoggedIn}
  },

  {
    path: "/signin",
    name: "signin",
    component: SignIn,
    meta: {layout: LAYOUT.NotLoggedIn}
  },
  {
    path: "/reset-password",
    name: "forgot-password",
    component: ResetPassword,
    meta: {layout: LAYOUT.NotLoggedIn}
  },
  // /password-reset/confirm/MTQ/582-7eaceed881cdc27447a3
  {
    path: "/password-reset/confirm/:uid/:token", // DO NOT CHANGE THIS PATH
    name: "password_reset_confirm",
    component: ChangePassword,
    meta: {layout: LAYOUT.NotLoggedIn}
  },
  {
    path: "/create-workspace",
    name: "createworkspace",
    component: CreateProject,
    meta: {layout: LAYOUT.NotLoggedIn}
  },
  {
    path: "/set-token",
    name: "set-token",
    component: SetSubdomainToken,
    meta: {layout: LAYOUT.NotLoggedIn}
  },

  {
    path: "/invite-members",
    name: "inviteMembers",
    component: InviteMembers,
    meta: {layout: LAYOUT.NotLoggedIn}
  },

  {
    path: "/join/invite/:key",
    name: "join-invite",
    component: JoinInvite,
    meta: {layout: LAYOUT.NotLoggedIn}
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      breadcrumb: 'User Settings'
    },
    children: [
      {
        path: 'account',
        name: 'AccountProfile',
        component: AccountProfile,
        meta: {
          breadcrumb: 'Account'
        }
      },
      {
        path: 'two_factor_auth',
        name: 'TwoFactorAuthenticator',
        component: TwoFactorAuthenticator,
        meta: {
          breadcrumb: 'Two-Factor Authentication',
          'twofa': 1
        }
      },
      {
        path: 'members',
        name: 'ManagerMemberWorkSpace',
        component: ManagerMemberWorkSpace,
        meta: {
          breadcrumb: 'Members',
        }
      },


    ]
  },
  {
    path: "/dashboard",
    name: "dashBoard",
    alias: '/me',
    component: DashBoard,
    meta: {}
  },
  {
    path: "/home",
    name: "home",
    redirect: {
      name: "HomeProject"
    },
    meta: {}
  },
  {
    path: "/kitchen-sink",
    name: "KitchenSink",
    component: KitchenSink,
    meta: {}
  },
  {
    path: "/kitchen-sink-2",
    name: "KitchenSink2",
    component: KitchenSink2,
    meta: {}
  },
  {
    path: "/kitchen-sink-3",
    name: "KitchenSink3",
    component: KitchenSink3,
    meta: {}
  },
  {
    path: "/kitchen-sink-4",
    name: "KitchenSink4",
    component: KitchenSink4,
    meta: {}
  },
  {
    path: "/kitchen-sink-5",
    name: "KitchenSink5",
    component: KitchenSink5,
    meta: {}
  },
  {
    path: "/kitchen-sink-6",
    name: "KitchenSink6",
    component: KitchenSink6,
    meta: {}
  },
  {
    path: "/kitchen-sink-7",
    name: "KitchenSink7",
    component: KitchenSink7,
    meta: {}
  },
  {
    path: "/kitchen-sink-8",
    name: "KitchenSink8",
    component: KitchenSink8,
    meta: {}
  },
  {
    path: "/project",
    name: "HomeProject",
    component: HomeProject,
    meta: {
      layoutType: "home",
    },

  },

  {
    path: "/task",
    name: "HomeTask",
    component: HomeTask,
    meta: {
      layoutType: "home"
    }
  },
  {
    path: "/meeting",
    name: "HomeMeeting",
    component: HomeMeeting,
    meta: {
      layoutType: "home"
    }
  },
  {
    path: "/meeting/detail",
    name: "HomeMeetingDetail",
    component: HomeMeetingDetail,
    meta: {
      layoutType: "home"
    },
    children: [
      {
        path: ":id",
        name: "meetingDetailContent",
        component: MeetingDetailContent,
        meta: {
          layoutType: "home"
        }
      }
    ]
  },
  {
    path: "/note",
    name: "HomeNotebook",
    component: HomeNotebook,
    meta: {
      layoutType: "home"
    }
  },
  {
    path: "/notebook",
    name: "ListNotebook",
    component: ListNotebook,
    meta: {}
  },
  {
    path: "/report/time-tracking",
    name: "ReportTimeTracking",
    component: ReportTimeTracking,
    meta: {}
  },
  {
    path: "/project/create",
    name: "CreateProject",
    component: CreateNewProject,
    meta: {}
  },

  {
    path: "/project/:projectId",
    name: "Detail",
    component: Detail,
    redirect: {
      name: "ProjectOverView"
    },
    meta: {
      layoutType: "project-detail",
      breadcrumb: 'Detail'
    },
    children: [
      {
        name: 'ProjectOverView',
        path: 'overview',
        component: ProjectOverView,
        meta: {
          layoutType: LAYOUT.NotLoggedIn,
          breadcrumb: 'Overview'
        }
      },
      {
        name: 'Boards',
        path: 'boards',
        component: HomeTaskBoard,
        meta: {
          breadcrumb: 'boards'
        },
        children: [
          {
            name: 'boardItemDetail',
            path: ':boardId',
            component: DetailTaskBoard,
            meta: {
              breadcrumb: 'board item'
            }
          }
        ]
      },

      {
        name: "ProjectTaskBoardDefault",
        path: "taskboard",
        component: HomeBoard,
        meta: {
          breadcrumb: 'Boards'
        }
      },
      {
        path: "time-entry",
        name: "ProjectTimeEntry",
        component: ProjectTimeEntry,
        meta: {
          layoutType: "project-detail"
        }
      },

      {
        name: "ProjectTaskBoard",
        path: "taskboard/:boardId/:type",
        component: Taskboard,
        meta: {
          layoutType: "project-detail",
          breadcrumb: 'Task board project'
        },
        children: [
          {
            name: "CardDetail",
            path: "card/:cardId",
            component: CardDetail,
            meta: {
              layoutType: "project-detail",
              breadcrumb: 'Task board card'
            }
          }
        ],

      },
      {
        path: "filing-room",
        component: FilingRoom,
        meta: {
          layoutType: "project-detail"
        }
      },
      {
        path: "exhibits",
        component: Exhibits,
        meta: {
          layoutType: "project-detail"
        },
        children: [
          {
            path: "session/:sessionId",
            component: ExhibitsDetail,
            meta: {}
          }
        ]
      },
      {
        path: "filing-room/:filingRoomId",
        component: FilingRoomDetail,
        meta: {
          layoutType: "project-detail"
        }
      },
      {
        path: "discussion",
        name: "discussion",
        component: ProjectDiscussion,
        meta: {},
        children: [
          {
            path: ":id",
            name: "discussionThread",
            component: DiscussionThread,
            meta: {}
          }
        ]
      },
      {
        path: "meeting",
        component: ProjectHomeMeeting,
        redirect: {
          name: "ProjectMeetingAgenda"
        },
        meta: {
          layoutType: "project-detail"
        },
        children: [
          {
            path: "agenda",
            name: "ProjectMeetingAgenda",
            component: ProjectMeetingAgenda,
            meta: {
              layoutType: "project-detail"
            }
          },
          {
            path: "weekly",
            name: "ProjectMeetingWeekly",
            component: ProjectMeetingWeekly,
            meta: {
              layoutType: "project-detail"
            }
          }
        ]
      },
      {
        path: "signatures",
        name: "ProjectSignature",
        component: Signature,
        meta: {
          layoutType: "project-detail"
        }
      },
      {
        path: "contacts",
        name: "contacts",
        component: Contacts,
        meta: {
          layoutType: "project-detail"
        }
      },
      {
        path: "contacts/:id",
        name: "ContactDetail",
        component: ContactDetail,
        meta: {
          layoutType: "project-detail"
        }
      },
      {
        path: "wiki",
        name: "wiki-detail",
        component: WikiProjectDetail,
        meta: {
          layoutType: "project-detail"
        }
      },

      {
        path: "resource-overview",
        name: "ProjectResourceOverview",
        component: ProjectOverviewResources,
        redirect: {
          name: "ProjectResourceOverviewTeam"
        },
        meta: {
          layoutType: "project-detail",
          breadcrumb: 'resource overview'
        },
        children: [
          {
            path: "team",
            name: "ProjectResourceOverviewTeam",
            component: ProjectOverviewResourcesTeam,
            meta: {
              layoutType: "project-detail",
              breadcrumb: 'Team'
            }
          },
          {
            path: "project",
            name: "ProjectResourceOverviewProject",
            component: ProjectOverviewResourcesProject,
            meta: {
              layoutType: "project-detail",
              breadcrumb: 'project'
            }
          }
        ],

      }
    ],

  },

  {
    path: "/notebook/:id",
    name: "NotebookDetail",
    component: NotebookDetailLayout,
    meta: {
      layoutType: "notebook-detail"
    },
    children: [
      {
        path: "session/:sessionId",
        component: NotebookDetail,
        meta: {
          layoutType: "notebook-detail"
        }
      }
    ],

  },
  {
    path: "/create-private-message",
    name: "CreatePrivateMessage",
    component: CreatePrivateMessage,
    meta: {}
  },
  {
    path: "/private-message",
    name: "PrivateMessage",
    component: PrivateMessage,
    meta: {},
    children: [
      {
        name: "PrivateMessageContent",
        path: ":id",
        component: PrivateMessageRealtime,
        meta: {}
      }
    ]
  },
  {
    path: "/announcements",
    name: "AnnouncementHome",
    component: AnnouncementHome,
    meta: {}
  },
  {
    path: "/settings",
    name: "Setting",
    component: Setting,
    meta: {
      layoutType: "setting"
    }
  },
  {
    path: "/settings/admin",
    name: "AdminSetting",
    component: AdminSetting,
    meta: {
      layoutType: "setting"
    }
  }
];
