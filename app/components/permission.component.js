const Permission = ({ project, repo, permission, groupList, valid }) =>
   <div className="permission">
      <tr>
         <td>{project}</td>
         <td>{repo}</td>
         <td>{permission}</td>
         <td>{groupList}.toString</td>
         <td>{valid}?"yes":"no"</td>
      </tr>
   </div>

export default Permission;