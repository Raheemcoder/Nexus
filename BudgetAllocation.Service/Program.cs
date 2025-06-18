
using BudgetAllocation.Service.Repository;
using BudgetSAPAllocation;

var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddWindowsService(options =>
{
    options.ServiceName = ".NET ISpace Service";
});

var configuration = builder.Configuration;

builder.Services.AddHostedService<Worker>();
builder.Services.AddSingleton<BudgetAllocationRepository>();
builder.Services.AddHostedService<Worker>();

var host = builder.Build();
host.Run();
