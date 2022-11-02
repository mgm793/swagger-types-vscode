// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const { getDataToPrint } = require("./src/getData");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "swagger-types-vscode" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "swagger-types-vscode.getTypes",
    async function () {
      const url = await vscode.window.showInputBox({
        placeHolder: "https://your-swagger-url.com",
        prompt: "Insert you swagger url",
      });
      if (!url) {
        vscode.window.showErrorMessage(
          "We need a swagger url to get the the types!"
        );
        return;
      }
      const paths = await getDataToPrint(url);
      vscode.window.showInformationMessage(
        JSON.stringify(JSON.stringify(paths))
      );
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
