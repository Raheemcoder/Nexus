using BOM_MaterialSync.Repository;
using BOM_MaterialSync;

var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddWindowsService(options =>
{
    options.ServiceName = ".NET ISpace Service";
});

var configuration = builder.Configuration;

builder.Services.AddHostedService<Worker>();
builder.Services.AddSingleton<BOM_MaterialSyncRepository>();
builder.Services.AddHostedService<Worker>();

var host = builder.Build();
host.Run();
