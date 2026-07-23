using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MalihaPolytex.Application.Features.WalkInApplication.DTOs
{
    public class DownloadResumesRequest
    {
        public List<int> WalkInApplicationIds { get; set; } = [];
    }
}
