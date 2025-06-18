using Autofac;
using Ideation.Data;
using Ideation.Core;
using Autofac.Extensions.DependencyInjection;
using Ideation;
using Ideation.Models;
using System.Configuration;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.ResponseCompression;
using System.IO.Compression;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Http.Features;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews().AddJsonOptions(opts => opts.JsonSerializerOptions.PropertyNamingPolicy = null);

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.MaxRequestBodySize = null;
}
);
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
});

builder.Services.Configure<BrotliCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.Fastest;
});

builder.Services.Configure<GzipCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.SmallestSize;
});
builder.Services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

builder.Logging.AddLog4Net();

builder.Services.Configure<FormOptions>(x =>
{
    x.ValueLengthLimit = int.MaxValue;
    x.MultipartBodyLengthLimit = int.MaxValue;
    x.MultipartBoundaryLengthLimit = int.MaxValue;
    x.MultipartHeadersCountLimit = int.MaxValue;
    x.MultipartHeadersLengthLimit = int.MaxValue;
});
builder.Services.AddAuthentication(options => { options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme; }).AddCookie(options =>
{
    options.LoginPath = "/Login/Login";
});

//binding the Web Api data from the appSetting.json to WebApi class
builder.Configuration.GetSection("WebApi").Bind(AppSettings.APIDetails);
builder.Configuration.GetSection("AppPath").Bind(AppSettingsPath.AppPathDetails);

// Call UseServiceProviderFactory on the Host sub property 
builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());

builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<IMasterRepository, MasterRepository>();
builder.Services.AddScoped<IInnovationRepository, InnovationRepository>();
builder.Services.AddScoped<IIdeationRepository, IdeationRepository>();
builder.Services.AddScoped<IDashBoardRepository, DashBoardRepository>();

builder.Services.AddScoped<INpdRepository, NpdRepository>();
builder.Services.AddScoped<IPackageInitiativeRepository, PackageInitiativeRepository>();
builder.Services.AddScoped<IReformulationRepository, ReformulationReopsitory>();
builder.Services.AddScoped<IApportionRepository, ApportionRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();

builder.Services.AddScoped<IMasterManagementRepository, MasterManagementRepository>();

builder.Services.AddScoped<IPrototypeRepository, PrototypeRepository>();

builder.Services.AddScoped<IProjectUpdatesRepository, ProjectUpdatesRepository>();

builder.Services.AddScoped<INPDLaunchMasterRepository, NPDLaunchMasterRepository>();

builder.Services.AddScoped<IEPPMMasterRepository, EPPMMasterRepository>();
builder.Services.AddScoped<IHomeRepository, HomeRepository>();
builder.Services.AddScoped<IGanttChartRepository, GanttChartRepository>();

builder.Services.AddScoped<IEffortRepository, EffortRepository>();
builder.Services.AddScoped<IApproveRepository, ApproveRepository>();
builder.Services.AddScoped<IClaimsGridRepository, ClaimsGridRepository>();


builder.Services.AddScoped<IProjectMasterRepository , ProjectMasterRepository>();
builder.Services.AddScoped<IProjectMasterRepository_OldUI, ProjectMasterRepository_OldUI>();

builder.Services.AddScoped<IRIDRepository , RIDRepository>();
builder.Services.AddScoped<ICommonRepository, CommonRepository>();
builder.Services.AddScoped<IRDMSRepository, RDMSRepository>();
builder.Services.AddScoped<IHGHRepository, HGHRepository>();


var configurationBuilder = new ConfigurationBuilder();
var path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
configurationBuilder.AddJsonFile(path, false);
var root = configurationBuilder.Build();
var powerBISettings = root.GetSection("PowerBI").Get<PowerBISettings>();

builder.Services.AddSingleton(powerBISettings);

//---added for session
builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromHours(2);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
//---------
var app = builder.Build();


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
if (!Directory.Exists(Path.Combine(Directory.GetCurrentDirectory(), "PMUMappingsUploads")))
    Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "PMUMappingsUploads"));
app.UseStaticFiles();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
                 Path.Combine(Directory.GetCurrentDirectory(), "PMUMappingsUploads")),
    RequestPath = "/PMUMappingsUploads"
});

app.UseRouting();
app.UseResponseCompression();
app.UseAuthentication();
app.UseAuthorization();
app.UseSession();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Login}/{action=Login}/{id?}");

app.Run();