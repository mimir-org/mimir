using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Mb.Core.Repositories
{
    public interface IGenericRepository<TContext, TEntity> where TContext : DbContext where TEntity : class
    {
        TContext Context { get; set; }
        DbSet<TEntity> DbSet { get; set; }
        IQueryable<TEntity> GetAll(bool noTracking = true);
        IQueryable<TEntity> FindBy(Expression<Func<TEntity, bool>> predicate, bool noTracking = true);
        Task<TEntity> GetAsync(int id);
        Task<TEntity> GetAsync(string id);
        Task<EntityEntry<TEntity>> CreateAsync(TEntity entity);
        void Update(TEntity entity);
        Task Delete(int id);
        void Detach(TEntity entity);
        void Attach(TEntity entity, EntityState state);
        Task<int> SaveAsync();
    }
}
