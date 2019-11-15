const got = require('got');

module.exports = async function (activity) {
  try {
    const model = getObjPath(activity.Request, "Data.model");

		switch (activity.Request.Path) {
      case "input":
        model.answer = 'Sweden, Norway, Denmark, Finland, Iceland (Jan Elton) (https://directory.cisco.com/dir/reports/janelton). Sweden, Norway, Denmark, Finland, Iceland (Jonas Edeback) (http://directory.cisco.com/dir/details/jedeback). Germany (Capital), Norway (Capital), Sweden (Capital), Finland (Capital), Denmark (Capital), Iceland (Capital) (Hans Schmitz) (http://directory.cisco.com/dir/details/haschmit)';
        break;
      default: break;
    }

		activity.Response.Data = model;
  } catch (error) {
    var m = error.message;    
    if (error.stack) m = m + ": " + error.stack;

    activity.Response.ErrorCode = (error.response && error.response.statusCode) || 500;
    activity.Response.Data = { ErrorText: m };
  }
};

function getObjPath(obj, path) {
	if (!path) return obj;
	if (!obj) return null;

	const paths = path.split('.');
	let current = obj;

	for (let i = 0; i < paths.length; ++i) {
		if (current[paths[i]] == undefined) {
			return {};
		} else {
			current = current[paths[i]];
		}
	}

	return current;
}