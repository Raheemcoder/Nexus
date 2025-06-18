using ProjectBudgetExpensesSync.Repository;
using ProjectBudgetExpensesSync;
using Microsoft.Extensions.Hosting;

var builder = Host.CreateApplicationBuilder(args);
object value = builder.Services.AddWindowsService(options =>
{
    options.ServiceName = ".NET ISpace Service";
});

var configuration = builder.Configuration;

builder.Services.AddHostedService<Worker>();
builder.Services.AddSingleton<ProjectBudgetExpensesSyncRepository>();
builder.Services.AddHostedService<Worker>();

var host = builder.Build();
host.Run();