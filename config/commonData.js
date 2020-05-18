export const MESSAGE_OPTIONS = [
{title: '系统反馈',color: '#1A7CFC',url: '/images/icon/icon_msg_setting.png'},
{title: '清单信息',color: '#12AE85',url: '/images/icon/icon_msg_order.png'},
{title: '退款申请',color: '#FB8D32',url: '/images/icon/icon_msg_rmb.png'},
{title: '系统信息',color: '#F488C0',url: '/images/icon/icon_msg_notice.png'}
]
 //选择标题  {key:传给后端的键, value:初始的默认显示标题}
export const HEADER_SELECT_TITLES = [
  {key:'key1',value:'veryGood'},
  {key:'key2',value:'english'},
  {key:'key3',value:'a'}
]

export const HEADER_SELECT_OPTIONS = [
  [
    { text: '很棒', value: 'veryGood' },
    { text: '优秀', value: 'good' },
    { text: '良好', value: 'normal' },
  ],
  [
    { text: '英语', value: 'english' },
    { text: '数学', value: 'math' },
    { text: '语文', value: 'yu' },
  ],
  [
    { text: '百强', value: 'a' },
    { text: '优秀教师', value: 'b' },
    { text: '一般教师', value: 'c'},
  ]
] //下拉数据 