
interface SqlMeta {
    sql: string;
    params: any[];
  }
  
  function getSqlParam(sql: string, params: any): SqlMeta {
    let tmp = sql.split('\t').join(' ').split('\n').join(' ') + ' ';
  console
    let sno = 0;
    let key = '';
    let convertSql = '';
    const convertParams = [];
  
    sno = tmp.indexOf('${');
    convertSql += tmp.substring(0, sno);
    tmp = tmp.substring(sno);
  
    while (sno > -1) {
      sno = tmp.indexOf('}');
      key = tmp.substring(2, sno);
      convertSql += '?';
  
      tmp = tmp.substring(sno+1);
      convertParams.push(params[key]);
  
      sno = tmp.indexOf('${');
      convertSql += tmp.substring(0, sno);
      tmp = tmp.substring(sno);
    }
  
    return {
      sql: convertSql,
      params: convertParams,
    };
  }
  


let sql = `UPDATE TB_USER
  SET USER_ID = $userId
  , EMAIL = \${email}
  , NAMES = \${names}
  , ENAMES = \${enames}
  , EMNO = \${emno}
  , AUTH = \${auth}
  , USE_YN = \${useYn}
WHERE ID = \${id}`;

console.log(sql);
const param = {
  id: 3,
  userId: 'user03',
  email: 'user03@test.co.kr',
  names: 'USER031',
  enames: 'User Name 03',
  emno: 'A0003',
  auth: 'USER,ADMIN',
  useYn: 'N'
};
console.log(param);

const q = getSqlParam(sql, param);
console.log(q);