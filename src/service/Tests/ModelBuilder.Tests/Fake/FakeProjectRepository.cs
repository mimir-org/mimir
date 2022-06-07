using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Mb.Data.Contracts;
using Mb.Models.Client;
using Mb.Models.Configurations;
using Mb.Models.Data;
using Mb.Models.Records;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace ModelBuilder.Tests.Fake
{
    public class FakeProjectRepository : IProjectRepository
    {
        public ModelBuilderDbContext Context { get; set; }
        public DbSet<Project> DbSet { get; set; }

        public IQueryable<Project> GetAll(bool noTracking = true)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Project> FindBy(Expression<Func<Project, bool>> predicate, bool noTracking = true)
        {
            throw new NotImplementedException();
        }

        public Task<Project> GetAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Project> GetAsync(string id)
        {
            throw new NotImplementedException();
        }

        public Task<EntityEntry<Project>> CreateAsync(Project entity)
        {
            throw new NotImplementedException();
        }

        public void Update(Project entity)
        {
            throw new NotImplementedException();
        }

        public Task Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task Delete(string id)
        {
            throw new NotImplementedException();
        }

        public void Detach(Project entity)
        {
            throw new NotImplementedException();
        }

        public void Attach(Project entity, EntityState state)
        {
            throw new NotImplementedException();
        }

        public void Attach(ICollection<Project> entities, EntityState state)
        {
            throw new NotImplementedException();
        }

        public Task<int> SaveAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Project> GetAsyncComplete(string id, string iri)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ProjectItemCm> GetProjectList(string name, int @from, int number)
        {
            throw new NotImplementedException();
        }

        public Task UpdateProject(Project original, Project updated, ProjectEditData data)
        {
            throw new NotImplementedException();
        }

        public Task CreateProject(Project original, ProjectData data)
        {
            throw new NotImplementedException();
        }

        public Task DeleteProject(Project original, ProjectData data)
        {
            throw new NotImplementedException();
        }
    }
}